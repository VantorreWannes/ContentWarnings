import json

FILTER = [f"{"#"*i}CENSORED{"#"*i}" for i in range(0, 5)]

def flatten(matrix):
    return [item for row in matrix for item in row]

def raw_data_to_flag_phrases(raw_data):
    all_phrases = flatten([content_category["words"] for content_category in raw_data])
    result = {phrase: [] for phrase in all_phrases}
    for content_category in raw_data:
        name = content_category["name"]
        for word in content_category["words"]:
            if word not in FILTER:
                result[word].append(name)
    return [{"phrase": k, "categories": v} for k, v in result.items()]

def main(): 
    with open("dist/data/raw_data.json") as f:
        raw_data = json.load(f)
    with open("dist/data/flag_phrases.json", "w") as f:
        json.dump(raw_data_to_flag_phrases(raw_data), f)   

if __name__ == "__main__":
   main()