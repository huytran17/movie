import IStory from "../../interfaces/story";
import Story from "../../entities/story";

export default interface IStoryDb {}

export interface PaginatedStoryResult {
  data: Story[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
