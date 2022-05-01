/**
 * @description This test should serve as a test for all controllers that make use of BaseController's functionality without modification
 */

import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`
});

import assert from "assert";
import {connect as mongooseConnect, Types} from 'mongoose';

import UserProfileController from "../../resources/controllers/UserProfile.controller";
import UserProfileModel from "../../resources/models/UserProfile.model";
import { IUserProfile } from "../../resources/interfaces/UserProfile.interface";

// Helpers

const testUserId = new Types.ObjectId().toHexString();
const userProfileController = new UserProfileController();

const createTestUser = async function (): Promise<IUserProfile> {
  // const userProfileController = new UserProfileController();
  const userObject: Partial<IUserProfile> = {
    _id: testUserId,
    firstName: "John",
    lastName: "Batman",
    emailAddress: "john.batman@bugsplatt.io",
    providerName: "auth0",
    accountId: "1001004"
  }
  return await userProfileController.createDocument(userObject) as IUserProfile;
}

// Helpers - End

beforeEach(async function() {
  await mongooseConnect(process.env.MONGO_DB_URI);
});

// Create
describe("UserProfileController.Create", function() {

  it("should create a new user profile", async function() {
    const newUser = await createTestUser();

    assert.equal(newUser!.emailAddress, "john.batman@bugsplatt.io");
  });
});

// Read
describe("UserProfileController.Read", function() {

  // const userProfileController = new UserProfileController();

  it("should retrive a user object", async function() {
    await createTestUser();
    const fetchedUser = await userProfileController.getDocumentById(testUserId);
    assert.equal(testUserId, fetchedUser!._id);
  });

  it("should retrieve a user object using custom object", async function() {
    await createTestUser();
    const fetchedUser = await userProfileController.getDocumentWithQuery({
      emailAddress: 'john.batman@bugsplatt.io',
    });
    assert.equal('john.batman@bugsplatt.io', fetchedUser.emailAddress);
  });

  it("should retrive a list of user objects", async function() {
    await createTestUser();
    const fetchedUsers = await userProfileController.getDocuments({});
    assert.equal(1, fetchedUsers.length);
  })
});

// Update
describe("UserProfileController.Update", function() {
  it("should update an existing user in the database", async function() {
    
    await createTestUser();
    const updateDoc: Partial<IUserProfile> = {firstName: "sam"};
    const updatedUser = await userProfileController.updateDocument(
      testUserId,
      updateDoc
    ) as IUserProfile;
    assert.equal(updateDoc.firstName, updatedUser!.firstName);
  });
});

// Delete
describe("UserProfileController.Delete", function() {
  it("should delete an existing user by id from the database", async function() {
    await createTestUser();
    const deletedDocument = await userProfileController.deleteDocument(testUserId) as IUserProfile;
    assert.equal(deletedDocument.emailAddress, 'john.batman@bugsplatt.io')
  });
});

afterEach(async function () {
  await UserProfileModel.deleteMany({});
});