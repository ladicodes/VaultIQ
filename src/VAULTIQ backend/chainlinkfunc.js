//Chainlink Functions call to AI endpoint

const source = `
  const response = await Functions.makeHttpRequest({
    url: "https://ai-verifier.api/verify",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      doc_url: args[0],
      metadata: args[1]
    }
  });
  if (!response || response.error) throw Error("Verification failed");
  return Functions.encodeString(response.data.status);
`
