class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
  :rememberable, :trackable, :validatable

  has_many :sites
  serialize :likes, Hash
  serialize :likes_per_site, Hash
  before_create :init_likes

  def like site
    self.likes[site.id] = 1 - (self.likes[site.id] || 0)
    self.save
    self.likes[site.id] == 1
  end

  def email_required?
    false
  end

  private 
  def init_likes
    self.likes ||= Hash.new(0)
  end

end
