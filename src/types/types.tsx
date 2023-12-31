export interface IComment {
  id: number,
  created: string,
  text: string,
  author: number,
  parent: number | null,
  likes: number,
}

export interface ICommentWithChildren extends IComment {
  children: ICommentWithChildren[],
  avatar: string,
  isLiked: boolean,
  media: IAuthor,
}

export interface IAuthor {
  id: number,
  name: string,
  avatar: string
}

export interface IPagination {
  page: number,
  size: number,
  total_pages: number,
}