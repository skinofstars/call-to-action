module ApplicationHelper

  def flash_messages(opts = {})
    flash.each do |type, message|
      concat(
        content_tag(:p, message, class: "bg-warning") do
          concat message
        end
      )
    end

    nil
  end

end
