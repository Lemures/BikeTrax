class User < ActiveRecord::Base


  before_save :split_devices
  after_create :add_user_to_cloud

# Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable


  # associations
  has_many :devices

  #Devise stuff
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  #validations
  validates :username , presence: true , uniqueness: true
  validates :tracker_id, uniqueness: true
  # validates :access_token, after_create: { presence: true , uniqueness: true  }

#varibale configurations

  serialize :tracker_id,Array



  private

  def split_devices

    if self.tracker_id.blank?
      self.tracker_id << 204
    #elsif self.changed?


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

  response= request.response.body
  response_json = JSON.parse(response)

  self.access_token = response_json['access_token'][0]


    #   set_scoped_access = Typhoeus::Request.new('https://api.particle.io/oauth/token',
  #                                             method: :post,
  #                                             body: {scope: "customer=#{self.email}",
  #                                                    grant_type: 'client_credentials',
  #                                                    expires_in: '7776000'},
  #                                             userpwd: "#{ENV{'client_id'}}:#{ENV{'client_secret'}}")
  #
  # set_scoped_access.run
  #
  # response= set_scoped_access.response.body
  # response_json = JSON.parse(response)
  # self.access_token = response_json['access_token'][0]




  end
end
