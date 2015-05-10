class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private
    def user_not_authorized
      flash[:alert] = t("auth.permission_denied")
      redirect_to(request.referrer || root_path)
    end

end
