import { uuid } from 'uuidv4';

class Auth {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
  /**
   * Set Created Date
   * @param {Date} createdAt
   */
  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  /**
   * Set Updated Date
   * @param {Date} updatedAt
   */
  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }

  /**
   * Set Deleted Date
   * @param {Date} deletedAt
   */
  setDeletedAT(deletedAt: Date) {
    this.deletedAt = deletedAt;
  }

  setPassword(password: string) {
    this.password = password;
  }

  static createUser(userObject): Auth {
    const user = new Auth(
      uuid(),
      userObject.email,
      userObject.password,
      userObject.username,
    );

    if (userObject.createdAt) {
      user.setCreatedAt(userObject.createdAt);
    }

    if (userObject.updatedAt) {
      user.setUpdatedAt(userObject.updatedAt);
    }

    if (userObject.deletedAt) {
      user.setDeletedAT(userObject.deletedAt);
    }

    return user;
  }
}

export default Auth;
