/**
 * Single task inside todo list
 */
interface ItemModel {
  /**
   * id from database
   */
  id: number;
  task_name: string;
  is_completed: boolean;
  checklists_uid: string;
}

interface ChecklistModel {
  /**
   * represents random string to create url similar to youtube video id
   */
  uid: string;
  title: string | null;
}

interface ChecklistDTO extends ChecklistModel {
  items: ItemModel[];
}

export { type ItemModel, type ChecklistModel };
