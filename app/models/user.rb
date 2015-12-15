class User < ActiveRecord::Base

  require 'base64'
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  before_save :split_devices

  after_save :add_user_to_cloud

  has_many :devices

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username , presence: true , uniqueness: true

  private

  def split_devices

    User.devise.split(',')

  end

  def add_user_to_cloud

  basic = Base64.encode64("#{Env{'client_id'}}:#{ENV{'client_secret'}}")
  request = Typhoeus::Request.new('https://api.particle.io/v1/orgs/subtletrax/customers',
                                   method: :post,
                                   body: {email: :email, no_password: 'true'},
                                   headers: {Authorization: "Basic #{basic}"  } )

  request.run


  end
end
