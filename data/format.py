import json

def flatten(matrix):
    return [item for row in matrix for item in row]

def format(file):
    with open(file, "r") as f:
        file = f.read()
    nested_json_list = [category for category in json.loads(file)]
    flattened_word_list = flatten([category["words"] for category in nested_json_list])
    words_dict = dict(zip(flattened_word_list, [[] for _ in range(len(flattened_word_list))]))
    for category in nested_json_list:
        for word in category["words"]:
            if category["name"] not in words_dict[word]:
                words_dict[word].append(category["name"])
    words_dict.pop("##CENSORED##")
    return json.dumps(words_dict)

if __name__ == "__main__":
    with open("data/flag_phrases.json", "w") as f:
        f.write(format("data/raw_data.json"))