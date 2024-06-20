import json

FILTER = [f"{"#"*i}CENSORED{"#"*i}" for i in range(0, 5)]

def flatten(matrix):
    return [item for row in matrix for item in row]

def raw_data_to_flag_phrases(raw_data):
    all_flag_phrases = flatten([data["words"] for data in raw_data])
    result = {phrase: [] for phrase in all_flag_phrases if phrase not in FILTER}
    for content_category in raw_data:
        name = content_category["name"]
        for flag_phrase in content_category["words"]:
            if flag_phrase not in FILTER and name not in result[flag_phrase]:
                result[flag_phrase].append(name)
    return result

def main(): 
    with open("src/data/raw_data.json") as f:
        raw_data = json.load(f)
    with open("src/data/flag_phrases.json", "w") as f:
        json.dump(raw_data_to_flag_phrases(raw_data), f)   

if __name__ == "__main__":
   main()