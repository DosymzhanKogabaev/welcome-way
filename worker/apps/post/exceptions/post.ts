export class PostNotFoundException extends Error {
  constructor(message: string = 'Post not found') {
    super(message);
    this.name = 'PostNotFoundException';
  }
}

export class PostCreationFailedException extends Error {
  constructor(message: string = 'Failed to create post') {
    super(message);
    this.name = 'PostCreationFailedException';
  }
}

export class PostUpdateFailedException extends Error {
  constructor(message: string = 'Failed to update post') {
    super(message);
    this.name = 'PostUpdateFailedException';
  }
}

export class PostDeletionFailedException extends Error {
  constructor(message: string = 'Failed to delete post') {
    super(message);
    this.name = 'PostDeletionFailedException';
  }
}

export class UnauthorizedPostAccessException extends Error {
  constructor(message: string = 'You are not authorized to access this post') {
    super(message);
    this.name = 'UnauthorizedPostAccessException';
  }
}
