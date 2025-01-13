import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export async function GET(request) {
  // console.log('api key is',process.env.GOOGLE_API_KEY)
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return new Response(
      JSON.stringify({ error: "Input query parameter is required" }),
      { status: 400 }
    );
  }

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_API_KEY,
        language: "en",
        components: "country:in",
      },
    });

    // Filter to only return city-related suggestions
    const citySuggestions = response.data.predictions.filter((prediction) => {
      // We check if the suggestion contains the city type
      return prediction.types.includes("locality");
    });

    // Return the city names
    const cityNames = citySuggestions.map((suggestion) => suggestion.description);

    return new Response(
      JSON.stringify({ predictions: cityNames }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Autocomplete Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
