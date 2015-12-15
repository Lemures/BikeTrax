class UserController < ApplicationController
  before_action :set_devices



  def index
    @devices

  end

  def show
    #@user = User.find(params[:id])

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

  def create

  end

  private

  def set_devices

    @devices = Particle.devices

  end

end
