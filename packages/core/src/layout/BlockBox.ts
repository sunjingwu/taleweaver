import BlockRenderNode from '../render/BlockRenderNode';
import ViewportBoundingRect from './ViewportBoundingRect';
import Position from './Position';
import Box from './Box';
import PageFlowBox from './PageFlowBox';
import LineFlowBox from './LineFlowBox';

type Parent = PageFlowBox;
type Child = LineFlowBox;

export default abstract class BlockBox extends Box {
  protected width?: number;
  protected height?: number;
  protected parent: Parent | null = null;
  protected children: Child[] = [];

  abstract getType(): string;

  setVersion(version: number) {
    if (this.version < version) {
      this.version = version;
      if (this.parent) {
        this.parent.setVersion(version);
      }
    }
  }

  getWidth() {
    return this.getParent().getInnerWidth();
  }

  getHeight() {
    if (this.height === undefined) {
      let height = this.getPaddingTop() + this.getPaddingBottom();
      this.children.forEach(child => {
        height += child.getHeight();
      });
      this.height = height;
    }
    return this.height;
  }

  setParent(parent: Parent | null) {
    this.parent = parent;
  }

  getParent() {
    if (!this.parent) {
      throw new Error('Block box has no parent set.');
    }
    return this.parent;
  }

  insertChild(child: Child, offset: number | null = null) {
    child.setParent(this);
    if (offset === null) {
      this.children.push(child);
    } else {
      this.children.splice(offset, 0, child);
    }
    this.clearCache();
  }

  deleteChild(child: Child) {
    const childOffset = this.children.indexOf(child);
    if (childOffset < 0) {
      throw new Error('Cannot delete child, child not found.');
    }
    child.setParent(null);
    child.markAsDeleted();
    this.children.splice(childOffset, 1);
    this.clearCache();
  }

  getChildren() {
    return this.children;
  }

  getPreviousSibling() {
    const siblings = this.getParent().getChildren();
    const offset = siblings.indexOf(this);
    if (offset < 0) {
      throw new Error(`Block box is not found in parent.`);
    }
    if (offset > 0) {
      return siblings[offset - 1];
    }
    const parentPreviousSibling = this.getParent().getPreviousSibling();
    if (!parentPreviousSibling) {
      return null;
    }
    const parentPreviousSiblingChildren = parentPreviousSibling.getChildren();
    return parentPreviousSiblingChildren[parentPreviousSiblingChildren.length - 1];
  }

  getNextSibling() {
    const siblings = this.getParent().getChildren();
    const offset = siblings.indexOf(this);
    if (offset < 0) {
      throw new Error(`Block box is not found in parent.`);
    }
    if (offset < siblings.length - 1) {
      return siblings[offset + 1];
    }
    const parentNextSibling = this.getParent().getNextSibling();
    if (!parentNextSibling) {
      return null;
    }
    const parentNextSiblingChildren = parentNextSibling.getChildren();
    return parentNextSiblingChildren[0];
  }

  getSelectableSize() {
    if (this.selectableSize === undefined) {
      let selectableSize = 0;
      this.children.forEach(child => {
        selectableSize += child.getSelectableSize();
      });
      this.selectableSize = selectableSize;
    }
    return this.selectableSize;
  }

  onRenderUpdated(renderNode: BlockRenderNode) {
    this.clearCache();
    this.width = undefined;
    this.height = undefined;
  }

  abstract splitAt(offset: number): BlockBox;

  abstract join(blockBox: BlockBox): void;

  resolvePosition(parentPosition: Position, selectableOffset: number) {
    const position = new Position(this, selectableOffset, parentPosition, (parent: Position) => {
      let cumulatedSelectableOffset = 0;
      for (let n = 0, nn = this.children.length; n < nn; n++) {
        const child = this.children[n];
        const childSelectableSize = child.getSelectableSize();
        if (cumulatedSelectableOffset + childSelectableSize > selectableOffset) {
          const childPosition = child.resolvePosition(parent, selectableOffset - cumulatedSelectableOffset);
          return childPosition;
        }
        cumulatedSelectableOffset += childSelectableSize;
      }
      throw new Error(`Selectable offset ${selectableOffset} cannot be resolved to position.`);
    });
    return position;
  }

  abstract resolveViewportPositionToSelectableOffset(x: number, y: number): number;

  abstract resolveSelectableOffsetRangeToViewportBoundingRects(from: number, to: number): ViewportBoundingRect[];

  protected clearCache() {
    super.clearCache();
    this.width = undefined;
    this.height = undefined;
  }
}