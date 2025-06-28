worker.process(async job => {
  const asset = await db.asset.findUnique({ where: { id: job.data.assetId } });
  const result = await callVerifierAPI(asset.fileUrl, asset.metadata);
  await db.asset.update({ where: { id: asset.id }, data: { score: result.score, status: result.status } });

  if (result.status !== "approved") {
    // Notify user or auto-freeze vault
  }
});
