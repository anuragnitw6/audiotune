
def index_response(api_key, text_path,query):
    
    # api key you generate in your openai account
    
    import os
    
    # add your openai api key here
    
    os.environ['OPENAI_API_KEY']=api_key
    
    # Load your data into 'Documents' a custom type by llamaIndex
    from llama_index import SimpleDirectoryReader, Document
    
    with open(text_path,'r') as file:
        
        text_history = file.read()
        
    documents = [Document(text_history)]
    
    from llama_index import GPTVectorStoreIndex
    
    index = GPTVectorStoreIndex.from_documents(documents)
    
    query_engine = index.as_query_engine()
    response=query_engine.query(query)
    
    return response.response
    
    

# initial query

prompt="This is some text to help clarify my search.  "

query1="Here is my question?"

prompt_submit=prompt+query1

# prompt_submit

response_string=index_response(api_key='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', 
               text_path='/static/test1.py',
               query=prompt_submit)

print(response_string)