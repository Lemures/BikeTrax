class UserController < ApplicationController
  before_action :set_devices

  before_action :authenticate_user! , except: :index


  def index

    @devices

  end

  def show

    @user = User.find(params[:id])


  end

  def update
    @user = User.update(user_params)

  end

  def map
    @device = RubySpark::Device.new(params[:id])

    @gpsCoords = @device.variable('gpsPos').split(',')

    @lat = @gpsCoords[0]

    @lng = @gpsCoords[1]

  end

  def ledToggle

    @device = RubySpark::Device.new(params[:id])

    if @device.variable('led') == 'off'

      @device.function('led', 'on')

    else

      @device.function('led', 'off')

    end

    redirect_to device_map_path(params[:id])

  end


  #   def new
  #
  #      @user = User.new
  #
  #   end
  #
  #
  # def create
  # @user = User.new(user_params)
  #
  # end

  private

  def user_params

    params.require(:user).permit(:email, :password, :password_confirmation, :username, :devices)

  end

  def set_devices

    @devices = Particle.devices

  end

end
