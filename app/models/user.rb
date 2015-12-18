class User < ActiveRecord::Base

  serialize :tracker_id,Array

# Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable

  before_save :split_devices

  #after_save :add_user_to_cloud

  has_many :devices

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username , presence: true , uniqueness: true


  private

  def split_devices

    if self.tracker_id.blank?
      self.tracker_id << 204

    # elsif self.tracker_id.include? :username
    #   self.tracker_id.clear
    #   self.tracker_id << self.lastname

    end

  end

  def add_user_to_cloud

  # basic = Base64.encode64("")
  request = Typhoeus::Request.new('https://api.particle.io/v1/orgs/subtletrax/customers',
                                   method: :post,
                                   body: {email: self.email , no_password: 'true'},
                                  userpwd: "#{ENV{'client_id'}}:#{ENV{'client_secret'}}")

  request.run


  end
end
