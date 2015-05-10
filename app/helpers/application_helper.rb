module ApplicationHelper

  def flash_messages(opts = {})
    flash.each do |type, message|
      concat(
        content_tag(:div, message, class: "alert") do
          concat message
        end
      )
    end

    nil
  end

end
