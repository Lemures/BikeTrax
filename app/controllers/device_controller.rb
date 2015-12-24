class DeviceController < ApplicationController
  before_action :set_devices
  #before_action :authenticate_user!

  def index

  end

  def show

   # @device = @device.User.find(params[:id])


  end

  def map

    if @devices.exists?

      @device = RubySpark::Device.new(params[:id])

      @gpsCoords = @device.variable('gpsPos').split(',')

      @lat = @gpsCoords[0]

      @lng = @gpsCoords[1]

    else
      @device = [{:gpsPos => "empty , empty" }]

      @gpsCoords = @device.variable('gpsPos').split(',')

      @lat = @gpsCoords[0]

      @lng = @gpsCoords[1]
    end



  end

  private

    def set_devices

      @devices = Particle.devices



    end

end
