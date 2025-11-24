class DivTray < Tray
  def make_html
    <<~HTML
      <div class="TRAY"><b>#{@caption}</b>
      #{@tray.map(&:make_html).join}</div>
    HTML
  end
end
