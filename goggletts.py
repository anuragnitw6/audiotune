'''
  For more samples please visit https://github.com/Azure-Samples/cognitive-services-speech-sdk 
'''

import azure.cognitiveservices.speech as speechsdk # type: ignore

# Creates an instance of a speech config with specified subscription key and service region.
speech_key = "e0ca2292e1e74bbcaf4eab53a4cfbce1"
service_region = "centralindia"

speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
# Note: the voice setting will not overwrite the voice element in input SSML.
speech_config.speech_synthesis_voice_name = "en-IN-AnanyaNeural"

text = ""
with open("dna.txt", "r",encoding="utf8") as file:
    text = file.read().replace("\n", "")


# will print ATCAGTGGAAACCCAGTGCTAGAGGATGGAATGACCTTAAATCAGGGACGATATTAAACGGAA


# use the default speaker as audio output.
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

result = speech_synthesizer.speak_text_async(text).get()
# ssml_string = open("ssml.xml", "r").read()
# result = speech_synthesizer.speak_ssml_async(ssml_string).get()

stream = speechsdk.AudioDataStream(result)
stream.save_to_wav_file("file.wav")

# Check result
if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("Speech synthesized for text [{}]".format(text))
elif result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        print("Error details: {}".format(cancellation_details.error_details))

