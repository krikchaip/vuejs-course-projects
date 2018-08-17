class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class FirebaseError extends CustomError {}
export class APIKeyError extends FirebaseError {}
export class TargetDBError extends FirebaseError {}
