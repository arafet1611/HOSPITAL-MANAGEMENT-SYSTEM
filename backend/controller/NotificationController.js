import Notification from "../model/NotificationModel.js";

export const getNotificationsByServiceIdOrUserIdOrRole = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { job, userId } = req.query;
    console.log(job, userId, serviceId);
    let filterCriteria = {};

    if (serviceId) {
      filterCriteria.serviceId = serviceId;
      console.log("Service ID query", JSON.stringify(filterCriteria));
    }

    if (job) {
      filterCriteria.job = job;
      console.log("Job query", JSON.stringify(filterCriteria));
    }

    if (userId) {
      filterCriteria.userId = userId;
      console.log("User ID query", JSON.stringify(filterCriteria));
    }

    console.log("Final filter criteria", JSON.stringify(filterCriteria));

    const allNotifications = await Notification.find().sort({
      createdAt: -1,
    });

    console.log("Retrieved all notifications", allNotifications);

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

    console.log("Filtered notifications", filteredNotifications);

    if (filteredNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.json(filteredNotifications);
  } catch (error) {
    console.error("Error retrieving notifications", error);
    res.status(400).json({ message: error.message });
  }
};
