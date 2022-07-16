function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generate_photos = async (prompt) => {
  const num_max_retry = 100;

  // TODO: sanity check prompt.
  const response_task = await fetch(
    "/api/dalle/create?" +
      new URLSearchParams({
        prompt,
      })
  );

  const task = await response_task.json();

  if (task && task.id) {
    for (let it = 0; it < num_max_retry; it++) {
      const response_task_updated = await fetch(
        "/api/dalle/task?" + new URLSearchParams({ id: task.id })
      );
      const task_updated = await response_task_updated.json();
      console.log("dall e", task_updated);
      if (task_updated && task_updated.status === "succeeded") {
        return task_updated;
      }
      await timeout(1000);
    }
  } else {
    console.error("Failed to create DALL E task", task);
  }
};
