require "stringio"
require 'rspec'

RSpec.describe "Composite pattern Main" do
  it do
    output = run_main

    expect(output).to include("/root (30000)")
    expect(output).to include("/root/bin (30000)")
    expect(output).to include("/root/bin/vi (10000)")
    expect(output).to include("/root/bin/latex (20000)")
    expect(output).to include("/root/usr/yuki/diary.html (100)")
    expect(output).to include("/root/usr/yuki/Composite.java (200)")
    expect(output).to include("/root/usr/hanako/memo.tex (300)")
    expect(output).to include("/root/usr/tomura/game.doc (400)")
    expect(output).to include("/root/usr/tomura/junk.mail (500)")
  end

  private

  def run_main
    old_stdout = $stdout
    captured = StringIO.new
    $stdout = captured

    rootdir = Directory.new("root")
    bindir  = Directory.new("bin")
    tmpdir  = Directory.new("tmp")
    usrdir  = Directory.new("usr")

    rootdir.add(bindir)
    rootdir.add(tmpdir)
    rootdir.add(usrdir)

    bindir.add(FileItem.new("vi", 10000))
    bindir.add(FileItem.new("latex", 20000))

    rootdir.print_list
    puts

    yuki   = Directory.new("yuki")
    hanako = Directory.new("hanako")
    tomura = Directory.new("tomura")

    usrdir.add(yuki)
    usrdir.add(hanako)
    usrdir.add(tomura)

    yuki.add(FileItem.new("diary.html", 100))
    yuki.add(FileItem.new("Composite.java", 200))

    hanako.add(FileItem.new("memo.tex", 300))
    tomura.add(FileItem.new("game.doc", 400))
    tomura.add(FileItem.new("junk.mail", 500))

    rootdir.print_list
    captured.string
  ensure
    $stdout = old_stdout
  end
end
