require 'rspec'
require 'fileutils'

RSpec.describe FileProperties do
  let(:input_file) { 'spec/fixtures/file.txt' }
  let(:output_file) { 'spec/tmp/newfile.txt' }

  before do
    FileUtils.mkdir_p('spec/fixtures')
    FileUtils.mkdir_p('spec/tmp')
    File.write(input_file, "width=640\n")
  end

  after do
    FileUtils.rm_rf('spec/tmp')
  end

  it 'ファイルから値を読み込める' do
    fp = FileProperties.new
    fp.read_from_file(input_file)
    expect(fp.get_value('width')).to eq('640')
  end

  it '値を設定して取得できる' do
    fp = FileProperties.new
    fp.set_value('depth', '32')
    expect(fp.get_value('depth')).to eq('32')
  end

  it 'ファイルに書き出せる' do
    fp = FileProperties.new
    fp.set_value('width', '1024')
    fp.set_value('height', '512')
    fp.set_value('depth', '32')

    fp.write_to_file(output_file)

    content = File.read(output_file)
    expect(content).to include('width=1024')
    expect(content).to include('height=512')
    expect(content).to include('depth=32')
  end
end
