from llama_index.core.readers import SimpleDirectoryReader
# from langchain import OpenAI
docs = SimpleDirectoryReader('./test/test1').load_data()