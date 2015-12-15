class DeviceController < ApplicationController
  before_action :set_devices
  #before_action :authenticate_user!

  def index

  end

  def show

   # @device = @device.User.find(params[:id])


  end

  def map

    @device = RubySpark::Device.new(params[:id])

    @gpsCoords = @device.variable('gpsPos').split(',')

    @lat = @gpsCoords[0]

    @lng = @gpsCoords[1]

  end

  private

    def set_devices

      @devices = Particle.device

    end

end
