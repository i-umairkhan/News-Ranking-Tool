import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import json

# Load the dataset
# print("Loading dataset...")
file_path = '2021.csv'  # Ensure this points to the location of your CSV file
data = pd.read_csv(file_path, usecols=['headline', 'short_description'])

# Fill missing values and combine text fields
# print("Preprocessing data...")
data['headline'] = data['headline'].fillna('')
data['short_description'] = data['short_description'].fillna('')
data['combined_text'] = data['headline'] + " " + data['short_description']

# Calculating TF-IDF matrix
# print("Calculating TF-IDF...")
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(data['combined_text'])

# Function to perform search with ranking based on cosine similarity
def search_with_ranking(query, tfidf_matrix, tfidf_vectorizer, data):
    # Transform the query to be compatible with the TF-IDF matrix
    query_vector = tfidf_vectorizer.transform([query])
    # Compute the cosine similarity between the query vector and all document vectors
    cosine_similarities = linear_kernel(query_vector, tfidf_matrix).flatten()
    # Get the top 10 matching documents
    top_matching_docs = cosine_similarities.argsort()[:-11:-1]
    # Fetch the documents and their scores
    result_docs = data.iloc[top_matching_docs]
    result_scores = cosine_similarities[top_matching_docs]
    return result_docs, result_scores

# Get the search query from command line arguments
query = sys.argv[1]

# print(f"Searching for query: '{query}'...")
result_docs, result_scores = search_with_ranking(query, tfidf_matrix, tfidf_vectorizer, data)

# Build a JSON object with the search results
json_results = []
for index, (doc, score) in enumerate(zip(result_docs.iterrows(), result_scores)):
    doc_index, doc_data = doc
    json_results.append({
        "doc_id": int(doc_index),
        "score": float(score),
        "headline": doc_data['headline'],
        "short_description": doc_data['short_description']
    })

# Print the JSON object
print(json.dumps(json_results, indent=2))
