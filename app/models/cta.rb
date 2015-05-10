class Cta < ActiveRecord::Base
  def words
    keywords.split(',')
  end
end
