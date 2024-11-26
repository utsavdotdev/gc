const API_URL = "https://gcs-wcc.hypermode.app/graphql";
const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjM1NDY4NTEsImlhdCI6MTczMjAxMDg1MSwiaXNzIjoiaHlwZXJtb2RlLmNvbSIsInN1YiI6ImFway0wMTkzNDNlNC0zYjdlLTc0NzgtOTM4YS0zN2UxNWI3MzFiMTMifQ.rk9O08lzF5riblpVY8Wv57EEMzRY2Pd2T9t_o9LRynESqZTNdp5VTtf7HObuK2h9Z65TOsde6gXoDEfSNxZMQA";

const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

export default fetchGraphQL;
