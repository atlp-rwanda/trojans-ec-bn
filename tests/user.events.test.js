import schedule from "node-schedule";
import Emitter from "../src/events/eventEmitter/user";

const { User } = require("../src/database/models");

jest.mock("../src/database/models");
jest.mock("events");
jest.mock("node-schedule");

describe("Emitter of user events", () => {
  let emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  describe("Scheduling actions", () => {
    it("should schedule a job to check user's password expiry", async () => {
      const mockUser = [
        {
          email: "example100@example.com",
          name: "Some Name",
          isVerified: true,
          password: "defaultPassword",
          gender: "Male",
          preferredLanguage: "English",
          preferredCurrency: "RWF",
          birthdate: "01/01/2000",
          billingAddress: '{"street":"KN }',
        },
      ];
      User.findAll.mockResolvedValue(mockUser);

      // Call the method
      await emitter.isPasswordExpired();

      // Verify that the schedule is set up correctly
      expect(schedule.scheduleJob).toHaveBeenCalledWith(
        "0 0 * * *",
        expect.any(Function)
      );
      // Call the scheduled function
      const scheduledFn = schedule.scheduleJob.mock.calls[0][1];
      scheduledFn();

      // Verify that the products are fetched correctly
      expect(User.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
