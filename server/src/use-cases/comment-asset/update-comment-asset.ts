import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";
import ICommentAsset from "../../interfaces/comment-asset";
import _ from "lodash";

interface IUpdateCommentAssetData {
  commentAssetDetails: Partial<ICommentAsset>;
}
export type IUpdateCommentAsset = ({
  commentAssetDetails,
}: IUpdateCommentAssetData) => Promise<CommentAsset | null>;

export default function makeUpdateCommentAsset(
  commentAssetDb: ICommentAssetDb
): IUpdateCommentAsset {
  return async function updateCommentAsset({
    commentAssetDetails,
  }: IUpdateCommentAssetData): Promise<CommentAsset | null> {
    const existing_by_id = await commentAssetDb.findById({
      id: commentAssetDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Comment Asset not found.");
    }

    const omit_list = ["_id"];

    const final_comment_asset_detail = _.omit(commentAssetDetails, omit_list);
    const comment_asset = new CommentAsset(
      Object.assign({}, existing, final_comment_asset_detail)
    );

    const updatedCommentAsset = await commentAssetDb.update(comment_asset);
    return updatedCommentAsset;
  };
}
