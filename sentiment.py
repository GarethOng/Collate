from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import sys

def analysis(statement):
 obj = SentimentIntensityAnalyzer()
 sentiment_value = obj.polarity_scores(statement)
 return sentiment_value["compound"]

js_input = sys.argv[1]

print(analysis(js_input))
sys.stdout.flush()