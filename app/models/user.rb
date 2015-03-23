class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
  :rememberable, :trackable, :validatable

  has_many :sites
  serialize :likes, Hash
  serialize :likes_per_site, Hash
  before_create :init_likes, :init_likes_per_site
  MAX_LIKES_PER_LAB = 3

  def has_like_for? site
    lab_likes_count(site.lab) > 0 and not liked? site
  end

  def like site
    self.likes[site.lab.id] = lab_likes_count(site.lab) - 1
    self.likes_per_site[site.id] = true
    self.save
  end

  def email_required?
    false
  end

  private 
  def init_likes
    self.likes ||= Hash.new(MAX_LIKES_PER_LAB)
  end

  def init_likes_per_site
    self.likes_per_site ||= {}
  end

  def lab_likes_count lab
    self.likes[lab.id] || MAX_LIKES_PER_LAB
  end

  def liked? site
    self.likes_per_site[site.id]
  end


end
