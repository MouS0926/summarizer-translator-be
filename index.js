const express=require("express")
const cors=require("cors")
const axios=require("axios")
const OpenAI = require("openai");
require("dotenv").config()

const app=express()


// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI GPT-3 API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    console.log(("get req"));
})


app.post('/generate', async (req, res) => {
  try {
    const text = req.body.text;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "you are a good Text generator who can generates creative and contextually relevant text on basis of given any topic"
        },
        {
          "role": "user",
          "content": text
        }
      ],
      temperature: 0.76,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  //   const summary = response

    const generated = response.choices[0].message.content;
// console.log(generated);
    res.status(200).send({ generated });
    
  } catch (error) {
      console.log(error);
    res.status(500).send({ error: 'An error occurred while generating the text.' });
  }
});


app.post('/summarize', async (req, res) => {
    try {
      const text = req.body.text;
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "you are a good Text Summarizer who can summarize the content of provided lengthy documents or articles of any domains.after summarizing the text content length should be less than the given content but cshould contain all important info"
          },
          {
            "role": "user",
            "content": text
          }
        ],
        temperature: 0.76,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    //   const summary = response

      const summary = response.choices[0].message.content;
  
      res.status(200).send({ summary });
      
    } catch (error) {
        console.log(error);
      res.status(500).send({ error: 'An error occurred while summarizing the text.' });
    }
  });



  app.post('/translate', async (req, res) => {
    try {
        
      const {text,language} = req.body;
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "you are a good  language translator who can translate the content of  provided text into any given language. "
          },
          {
            "role": "user",
            "content": `${text}. translate into ${language}`
          }
        ],
        temperature: 0.76,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    //   const summary = response

      const summary = response.choices[0].message.content;
  // console.log(summary);
      res.status(200).send({ summary });
    } catch (error) {
        console.log(error);
      res.status(500).send({ error: 'An error occurred while summarizing the text.' });
    }
  });

//   {
//     "text":"These all-natural disasters are directly associated with the climate.",
//     "language":"bengali"
// }

app.listen(8080,()=>{
    console.log("server is running");
})