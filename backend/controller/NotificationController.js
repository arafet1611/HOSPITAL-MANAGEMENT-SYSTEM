import Notification from "../model/NotificationModel.js";

export const getNotificationsByServiceIdOrUserIdOrRole = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { job, userId } = req.query;
    let filterCriteria = {};

    if (serviceId) {
      filterCriteria.serviceId = serviceId;
    }

    if (job) {
      filterCriteria.job = job;
    }

    if (userId) {
      filterCriteria.userId = userId;
    }

    const allNotifications = await Notification.find().sort({
      createdAt: -1,
    });

    const filteredNotifications = allNotifications.filter((notification) => {
      return (
        !filterCriteria.serviceId ||
        notification.serviceId.toString() === filterCriteria.serviceId ||
        !filterCriteria.job ||
        notification.job === filterCriteria.job ||
        !filterCriteria.userId ||
        notification.userId.toString() === filterCriteria.userId
      );
    });

    if (filteredNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.json(filteredNotifications);
  } catch (error) {
    console.error("Error retrieving notifications", error);
    res.status(400).json({ message: error.message });
  }
};
