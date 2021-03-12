class Review < ApplicationRecord
    belongs_to :villager

    validates :rating, presence: true, numericality: {greater_than: 0, less_than_or_equal_to: 10}
    
    def villager_attributes=(villager_name)
        self.villager = Villager.find_or_create_by(name: villager_name)
    end

end
