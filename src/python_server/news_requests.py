from flask import jsonify, request
from app import app
from tinydb import Query
import db

@app.route('/news', methods=['POST'])
def add_news_article():
  try:
    header = request.json['header']
    body = request.json['body']
    article_id = db.news.insert({ 
      'header': header, 
      'body': body,
      'archive': False
    })
    return { 'article_id': article_id }
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

@app.route('/news/archive', methods=['POST'])
def archive_news_articles():
  try:
    id_to_archived = request.json
    for article_id, is_archived in id_to_archived.items():
      print(article_id, is_archived)
      db.news.update({ 'archived': is_archived }, eids = [int(article_id)])
    return { }
  except (IndexError, TypeError, KeyError):
    return { }
