import { TSchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1998-05-10T${schedule.startTime}`);
    const existingEndTime = new Date(`1998-05-10T${schedule.endTime}`);
    const newStartTime = new Date(`1998-05-10T${newSchedule.startTime}`);
    const newEndTime = new Date(`1998-05-10T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
    return false;
  }
};
