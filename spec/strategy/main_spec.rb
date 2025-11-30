require 'rspec'

RSpec.describe 'Strategy Pattern' do
  describe 'Game simulation' do
    it do
      player1 = Player.new("Taro", WinningStrategy.new(314))
      player2 = Player.new("Hana", ProbStrategy.new(15))

      results = []
      100.times do
        hand1 = player1.next_hand
        hand2 = player2.next_hand

        if hand1.stronger_than?(hand2)
          results << :player1_win
          player1.win
          player2.lose
        elsif hand2.stronger_than?(hand1)
          results << :player2_win
          player1.lose
          player2.win
        else
          results << :even
          player1.even
          player2.even
        end
      end

      expect(player1.game_count).to eq(100)
      expect(player2.game_count).to eq(100)
      expect(player1.win_count + player2.win_count + results.count(:even)).to eq(100)
    end

    it do
      player1 = Player.new("Taro", WinningStrategy.new(314))
      player2 = Player.new("Hana", ProbStrategy.new(15))

      10000.times do
        hand1 = player1.next_hand
        hand2 = player2.next_hand

        if hand1.stronger_than?(hand2)
          player1.win
          player2.lose
        elsif hand2.stronger_than?(hand1)
          player1.lose
          player2.win
        else
          player1.even
          player2.even
        end
      end

      expect(player1.game_count).to eq(10000)
      expect(player2.game_count).to eq(10000)

      win_rate1 = player1.win_count.to_f / player1.game_count
      win_rate2 = player2.win_count.to_f / player2.game_count
      expect(win_rate1).to be_between(0, 1)
      expect(win_rate2).to be_between(0, 1)
    end
  end
end
