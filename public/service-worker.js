// ✅ User ke button click ko handle karna
self.addEventListener("notificationclick", function (event) {
  if (!event.action) return;

  const apiUrl = "http://localhost:5000/api/medicine-status"; // backend ka URL
  const { userId, medicineName, doseTime } = event.notification.data;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      medicineName,
      doseTime,
      status: event.action, // taken/missed
    }),
  });

  event.notification.close();
});
