// src/services/UserService.ts

import User from "../models/User";

class UserService {
  static async getUsers() {
    return await User.findAll();
  }

  static async createUser(name: string, email: string) {
    return await User.create({ name, email });
  }
}

export default UserService;
