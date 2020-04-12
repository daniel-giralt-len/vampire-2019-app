from flask import jsonify, request
from app import app
from tinydb import Query
import db

@app.route('/news', methods=['PUT'])
def add_news_article():
  try:
    header = request.json['header']
    body = request.json['body']
    article_id = db.news.insert({ 
      'header': header, 
      'body': body,
      'archived': False
    })
    return { 'articleId': article_id }
  except (IndexError, TypeError, KeyError):
    return { }

@app.route('/news', methods=['GET'])
def get_all_news():
  try:
    raw_news = db.news.all()
    for r in raw_news:
      r['id'] = r.eid
    return jsonify(raw_news)
  except (IndexError, TypeError, KeyError):
    return { }

@app.route('/news/fresh', methods=['GET'])
def get_fresh_news():
  try:
    news = db.news.search(Query().archived == False)
    for a in news:
      a['id'] = a.eid
    return jsonify(news)
  except (IndexError, TypeError, KeyError):
    return { }

@app.route('/news', methods=['POST'])
def archive_news_articles():
  try:
    articles = request.json
    for article in articles:
      db.news.update({ 
        'header': article['header'],
        'body': article['body'],
        'archived': article['archived']
      }, eids = [article['id']])
    return { }
  except (IndexError, TypeError, KeyError):
    return { }
