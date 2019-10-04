# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :messages
- has_many :group_users
- has_many  :groups,  through:  :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|
|grouo_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many  :users,  through:  :grops_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|img|string|
|group_id|integer|null: false|
|user_id|integer|null: false|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group