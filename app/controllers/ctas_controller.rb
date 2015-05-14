class CtasController < ApplicationController
  respond_to :html, :json

  def index
    @ctas = Cta.filter_published(admin: !current_user.nil? && current_user.admin?).all
  end

  def search
    params[:story]
  end

  def new
    @cta = Cta.new
    authorize @cta, :create?

    respond_with @cta
  end

  def create
    @cta = Cta.new(cta_params)

    # regardless, set this to false if it's an anonymous user
    if current_user.anon?
      @cta.published = false
    end

    # TODO captcha - https://github.com/ambethia/recaptcha

    if @cta.save
      flash[:notice] = "Thank you! Your submission will appear here after a review."

      # TODO notify admin users

      redirect_to ctas_path
    else
      respond_with @cta
    end

  end

  def edit
    @cta = Cta.find(params[:id])
    authorize @cta, :edit?

    respond_with @cta
  end

  def update
    @cta = Cta.find(params[:id])
    authorize @cta, :update?

    if @cta.update(cta_params)
      flash[:notice] = "updated"
      respond_with @cta, location: ctas_path, id: @cta.id
    else
      respond_with @cta
    end
  end

  def destroy
    @cta = Cta.find(params[:id])
    authorize @cta, :destroy?

    @cta.destroy

    redirect_to ctas_path
  end

  private
    def cta_params
      params
        .require(:cta)
        .permit(
          :title,
          :url,
          :always,
          :keywords,
          :published
        )
    end
end
