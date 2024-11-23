const API_URL = process.env.MODUS_API_URL || "http://localhost:8686/graphql";

const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
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
    console.error("Error fetching GraphQL:", error);
    throw error;
  }
};

export default fetchGraphQL;
