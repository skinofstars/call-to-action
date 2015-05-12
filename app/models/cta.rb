class Cta < ActiveRecord::Base
  scope :filter_published, (lambda do |args|
    if args[:admin] != true
      where(published: true)
    end
  end)

  def words
    keywords.split(',')
  end
end
